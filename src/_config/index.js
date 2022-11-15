const config =
  process.env.NODE_ENV === "development"
    ? {
        api: "http://localhost:5000/api/",
        baseUrl: "http://localhost:5000/",
      }
    : {
        api: "",
        baseUrl: "",
      };

export default config;
