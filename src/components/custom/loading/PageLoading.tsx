import classes from "./PageLoading.module.css";

const PageLoading = () => {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#ccc]/10 backdrop-blur-sm"></div>

      <div className="relative z-[1101] flex items-center justify-center">
        <div className="bg-secondary-light p-4 shadow-lg rounded-full">
          <div className={classes.circle_spinner}>
            <div className={classes.circle}></div>
            <div className={classes.orbit}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
