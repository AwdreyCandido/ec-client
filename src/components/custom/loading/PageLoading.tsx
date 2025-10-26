import classes from "./PageLoading.module.css";

const PageLoading = () => {
  return (
    <>
      <div className="absolute w-screen h-screen left-0 top-0 bg-[#ccc]/10 backdrop-blur-xs z-[1100]"></div>
      <div className={`absolute  flex justify-start items-end p-8 z-[1100]`}>
        <div className="bg-secondary-light absolute top-0 -translate-x-[50%] translate-y-[50%] left-[50%] p-4 shadow-lg rounded-full">
          <div className={classes.circle_spinner}>
            <div className={classes.circle}></div>
            <div className={classes.orbit}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLoading;
