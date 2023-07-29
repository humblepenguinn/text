import getUsers from "../actions/getUsers";
import { SideBar } from "../components/sidebar/Sidebar";
import UserList from "../components/users/UsersList";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const users = await getUsers();
  return (
    // @ts-ignore
    <SideBar>
      <div className="h-full">
        <UserList items={users} />
        {children}
        </div>
    </SideBar>
  );
}
