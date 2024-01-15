import { CONSTANTS, NREL_API } from './constants';
import axios from 'axios';
import * as countries from 'countries-list';
import * as ctg from 'country-reverse-geocoding';

export const getCountry = (latitude: number, longitude: number) => {
  const geoClient = ctg.country_reverse_geocoding();
  const { code, name } = geoClient.get_country(latitude, longitude);
  return {
    code: code,
    name: name,
  };
};

export const getContinent = (country: string) => {
  const code = countries.getCountryCode(country) as countries.TCountryCode;
  const res = countries.getCountryData(code);

  return {
    name: res.name,
    native: res.native,
    phone: res.phone,
    continent: res.continent,
    continents: res.continents,
    capital: res.capital,
    currency: res.currency,
    languages: res.languages,
    iso2: res.iso2,
    iso3: res.iso3,
  };
};

const getRegionInfoSystemNative = (latitude: number, longitude: number) => {
  const country = getCountry(latitude, longitude).name;
  const countryInfo = getContinent(country);
  const region = countryInfo.continent ?? country;
  return CONSTANTS.find((constant) => constant.region === region);
};

// Function to get solar radiation data from NREL Solar Radiation API
const getSolarRadiation = async (
  latitude: number,
  longitude: number
): Promise<number> => {
  const apiKey = NREL_API; // Replace with your actual NREL API key
  const apiUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${apiKey}&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.outputs.avg_ghi === 'no data') {
      return getRegionInfoSystemNative(latitude, longitude).srf;
    }

    const months = response.data.outputs.avg_ghi?.monthly;

    const keys = Object.keys(months);
    const month = new Date().getMonth();

    // const solarRadiation: number = response.data.outputs.avg_ghi.annual || 0; // Radiation data is in kWh/m^2 (use this if annual is needed)
    const solarRadiation: number = months[keys[month]] || 0; // Radiation data is in kWh/m^2
    return solarRadiation;
  } catch (error: any) {
    console.error('Error fetching solar radiation data:', error?.message);
    return getRegionInfoSystemNative(latitude, longitude).srf;
  }
};

// Function to calculate carbon credits per day
export const calculateDailyCarbonCredits = async (
  latitude: number,
  longitude: number,
  panelSize: number,
  powerOutput: number,
  deviceId?: number
) => {
  // Constants (values are for illustration, replace with actual data)
  const carbonIntensityOfGrid: number = getRegionInfoSystemNative(
    latitude,
    longitude
  ).cif; // kg CO2/kWh
  const carbonReductionFactor: number = 0.95; // Adjust as needed based on efficiency, losses, etc.

  // Function to get daily electricity generation based on solar panel size and power output
  const getDailyElectricityGeneration = (solarRadiation: number): number => {
    // Convert solar radiation to kWh/m^2
    const solarRadiationKWh = solarRadiation / 1000;

    // Calculate daily electricity getDailyElectricityGeneration
    return panelSize * powerOutput * solarRadiationKWh;
  };

  // Get solar radiation data
  const solarRadiation: number = await getSolarRadiation(latitude, longitude);

  // Calculate daily electricity generation
  const dailyElectricityGeneration: number =
    getDailyElectricityGeneration(solarRadiation);

  // Calculate daily carbon reduction
  const dailyCarbonReduction: number =
    dailyElectricityGeneration * carbonIntensityOfGrid * carbonReductionFactor;
  return {
    deviceId,
    dailyCarbonReduction,
  };
};
