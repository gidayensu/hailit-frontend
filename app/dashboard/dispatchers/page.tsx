"use client";
import withAdminCheck from "@/components/Dashboard/withAdminCheck";
import ErrorComponent from "@/components/Shared/ErrorComponent";

const Dispatchers = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <ErrorComponent
        errorCode={404}
        errorMessage="Page Not Found"
        url="/dashboard"
      />
    </div>
  );
};

export default withAdminCheck(Dispatchers);
