declare module 'country-reverse-geocoding' {
  function country_reverse_geocoding(): get_country;
  // Promise<{ country: string } | null>;
  export { country_reverse_geocoding };
}
