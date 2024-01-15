import axios from 'axios';
import { NREL_API } from './constants';
import logger from '../../shared/logger';

// Function to get solar radiation forecast data from NREL Solar Radiation API
const getSolarRadiationForecast = async (
  latitude: number,
  longitude: number
): Promise<number[]> => {
  const apiKey = NREL_API; // Replace with your actual NREL API key
  const apiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&lat=${latitude}&lon=${longitude}&all=1`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data.outputs.avg_dni.monthly;
    const months = Object.keys(data);

    const dniForecast: number[] = months.map((month: any) => data[month]); // Monthly Direct Normal Irradiance (DNI) forecast, in kWh/m^2/day

    return dniForecast;
  } catch (error: any) {
    console.error(
      'Error fetching solar radiation forecast data:',
      error.message
    );
    return [];
  }
};

// Function to estimate PV generation based on solar radiation
const estimatePVGeneration = (
  panelSize: number,
  powerOutput: number,
  solarRadiation: number
): number => {
  // Calculate daily PV generation
  return panelSize * powerOutput * solarRadiation;
};

// Function to show PV forecast for a specified number of days
export const showPVForecast = async (
  latitude: number,
  longitude: number,
  panelSize: number | '',
  powerOutput: number | '',
  days: number
) => {
  // Get solar radiation forecast data
  const dniForecast: number[] = await getSolarRadiationForecast(
    latitude,
    longitude
  );
  const forecast: {
    day: number;
    direct_normal_irradiance: string;
    pv_generation: string;
  }[] = [];

  logger('latitude', latitude);
  logger('longitude', longitude);
  logger('panelSize', panelSize);
  logger('powerOutput', powerOutput);
  logger('days', days);

  // Display PV forecast for each day
  for (let day = 0; day < days && day < dniForecast.length; day++) {
    const dni: number = dniForecast[day];
    const pvGeneration: number = estimatePVGeneration(
      parseFloat(panelSize as string),
      parseFloat(powerOutput as string),
      dni
    );
    forecast.push({
      day: day + 1,
      direct_normal_irradiance: dni.toFixed(2), //kWh/m^2
      pv_generation: pvGeneration.toFixed(2), //kWh
    });
  }
  return forecast;
};
