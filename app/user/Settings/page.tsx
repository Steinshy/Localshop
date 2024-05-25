// Components
import Breadcrumb from "@components/layout/breadCrumb";

const SettingsPage = () => {
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Settings" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2">Settings</h1>
    </div>
  );
}

export default SettingsPage;
