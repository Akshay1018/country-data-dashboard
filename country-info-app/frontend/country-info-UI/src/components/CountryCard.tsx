import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Country } from "../types/country";

interface Props {
  country: Country;
}

const timeZoneMap: Record<string, string> = {
  "UTC+00:00": "Etc/UTC",
  "UTC+01:00": "Europe/Paris",
  "UTC+02:00": "Europe/Helsinki",
  "UTC+03:00": "Europe/Moscow",
  "UTC+03:30": "Asia/Tehran",
  "UTC+04:00": "Asia/Dubai",
  "UTC+04:30": "Asia/Kabul",
  "UTC+05:00": "Asia/Karachi",
  "UTC+05:30": "Asia/Kolkata",
  "UTC+05:45": "Asia/Kathmandu",
  "UTC+06:00": "Asia/Dhaka",
  "UTC+06:30": "Asia/Yangon",
  "UTC+07:00": "Asia/Bangkok",
  "UTC+08:00": "Asia/Shanghai",
  "UTC+09:00": "Asia/Tokyo",
  "UTC+09:30": "Australia/Adelaide",
  "UTC+10:00": "Australia/Sydney",
  "UTC+11:00": "Pacific/Noumea",
  "UTC+12:00": "Pacific/Auckland",
  "UTC-01:00": "Atlantic/Azores",
  "UTC-02:00": "America/Noronha",
  "UTC-03:00": "America/Argentina/Buenos_Aires",
  "UTC-03:30": "America/St_Johns",
  "UTC-04:00": "America/New_York",
  "UTC-05:00": "America/Chicago",
  "UTC-06:00": "America/Denver",
  "UTC-07:00": "America/Los_Angeles",
  "UTC-08:00": "America/Anchorage",
  "UTC-09:00": "Pacific/Gambier",
  "UTC-10:00": "Pacific/Honolulu",
  "UTC-11:00": "Pacific/Midway",
  "UTC-12:00": "Etc/GMT+12",
};

const CountryCard = ({ country }: Props) => {
  const getLocalTime = (timezone: string) => {
    const ianaZone = timeZoneMap[timezone];
    try {
      const date = new Date().toLocaleString("en-US", {
        timeZone: ianaZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return date;
    } catch {
      return "N/A";
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border:'1px solid #6666' }}>
      <CardMedia
        component="img"
        height="150"
        image={country.flag}
        alt={country.name}
      />
      <CardContent>
        <Typography variant="h6">{country.name}</Typography>
        <Typography variant="body2">Region: {country.region}</Typography>
        <Typography variant="body2">
          Time: {getLocalTime(country.timezones?.[0])}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
