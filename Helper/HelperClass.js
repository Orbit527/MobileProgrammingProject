export const formatDuration = (duration) => {
  hours = Math.floor(duration / 3600);
  duration %= 3600;
  minutes = Math.floor(duration / 60);
  seconds = duration % 60;
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};

export const distanceToKm = (distance) => {
  return Math.round((distance / 1000) * 100) / 100;
};

export const formatPace = (pace) => {
  if (pace === Infinity) {
    return 0;
  }
  return Math.round(pace * 100) / 100;
};

export const formatTimestampHours = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0")
  );
};

export const formatTimestampDay = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  return (
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear()
  );
};
