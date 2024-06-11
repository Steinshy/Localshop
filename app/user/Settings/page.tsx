// Components
import ThemeSwitcher from "@utils/themeSwitcher";
import Breadcrumb from "@components/layout/breadCrumb";

const SettingsPage = () => {
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Settings" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <ThemeSwitcher />
    </div>
  );
}

export default SettingsPage;
