import BeatLoader from "react-spinners/BeatLoader";

export const Loader = () => {
  return (
    <BeatLoader
      color="var(--color-orange)"
      size={25}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
