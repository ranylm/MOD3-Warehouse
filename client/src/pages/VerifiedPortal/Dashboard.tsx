import { useEffect, useState, useContext } from "react";
import CreateOrgForm from "../../components/Dashboard/CreateOrgForm";
import CreateOwnWarehouse from "../../components/Dashboard/CreateOwnWarehouse";
import { User } from "../../utilities/agent-service";
import { getUser } from "../../utilities/user-service";
import { StateContext } from "../../App";
import { Link } from "react-router-dom";
import UserWarehouseList from "../../components/Dashboard/UserWarehouseList";

export default function Dashboard() {
  const [orgs, setOrgs] = useState<
    { name: string; _id: string; owner: string }[]
  >([]);

  const context = useContext(StateContext);

  const user = getUser();

  const getUserOrgs = async () => {
    const orgs = await User.getOrg().send();
    setOrgs(orgs);
    console.log("Orgs", orgs);
  };

  useEffect(() => {
    getUserOrgs();
  }, []);

  return (
    <div>
      <div id="Forms" className="flex flex-row gap-6">
        <CreateOwnWarehouse type="User" />
        <CreateOrgForm />
      </div>
      <div className="flex flex-row">
        <ul className="">
          <h1 className="text-center">Organizations</h1>
          {orgs?.map?.((e) => {
            return (
              <Link
                to="/organization"
                onClick={() =>
                  context?.setGlobal?.({ ...context.global, orgId: e._id })
                }
              >
                <li className="text-teal-300 capitalize shadow-lg rounded-lg flex flex-col bg-teal-800 m-2 p-2 min-w-[15rem] border border-teal-500">
                  <div className="flex flex-col">
                    <span className="text-xl">{e.name}</span>
                    <span className="text-xl">
                      {e.owner === user._id ? "Owner" : "Member"}
                    </span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
        <UserWarehouseList />
      </div>
    </div>
  );
}
