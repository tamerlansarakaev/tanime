const volumeSliderStyles = {
  color: "#fff",
  opacity: "0.5",
  width: "50px",
  cursor: "pointer",

  ":hover": {
    opacity: 1,
    "& .MuiSlider-thumb": {
      width: "10px",
      height: "10px",
    },

    "& .MuiSlider-track": {
      cursor: "pointer",
    },
  },

  "& .MuiSlider-thumb": {
    width: 0,
    height: 0,
    transition: "0.2s",
  },
  "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
    boxShadow: "none",
  },
  "& .MuiSlider-thumb.Mui-active": {
    boxShadow: "none",
  },
  "& .MuiSlider-track": {
    cursor: "default",
  },
};

const progressSliderStyles = {
  color: "#f74343",
  opacity: "0.5",

  ":hover": {
    opacity: 1,

    "& .MuiSlider-track": {
      cursor: "pointer",
    },

    "& .MuiSlider-thumb": {
      width: "18px",
      height: "18px",
    },
  },

  "& .MuiSlider-thumb": {
    width: 0,
    height: 0,
    transition: "0.2s",
  },
  "& .MuiSlider-thumb:hover, & .MuiSlider-thumb.Mui-focusVisible": {
    boxShadow: "none",
  },
  "& .MuiSlider-thumb.Mui-active": {
    boxShadow: "none",
  },
  "& .MuiSlider-track": {
    cursor: "default",
  },
};

export const stylesMUI = {
  sliders: {
    volume: volumeSliderStyles,
    progress: progressSliderStyles,
  },
};
