import { useEffect, useState } from "react";
import type { IUserModel } from "../utils/inteerfaces";
import { get } from "../utils/httpEntity.service";
import { APIURLS } from "../utils/APIURLS";

function Users() {
  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
    get(APIURLS.USERS).then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
