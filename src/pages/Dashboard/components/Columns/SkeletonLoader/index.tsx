import Skeleton from "react-loading-skeleton";
import * as Styled from "./styles";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <Skeleton
      data-testid="skeleton-loader-column"
      wrapper={Styled.Wrapper}
      borderRadius={8}
      count={3}
      height={159}
      baseColor={"#f8f8fa"}
      highlightColor={"#e5e6eb95"}
    />
  );
};

export default Loader;
