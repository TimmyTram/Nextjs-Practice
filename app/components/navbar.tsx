import AdminOnly from "./adminOnly";
import CreateLocationButton from "./createLocationButton";
import DeleteLocationButton from "./deleteLocationButton";
import HomeButton from "./homebutton";
import UserInfo from "./userInfo";


export default function Navbar() {

    return (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-4">
                <HomeButton />
                <CreateLocationButton />
                <DeleteLocationButton />
            </div>
            <div className="flex justify-end space-x-8"> 
                <AdminOnly />
                <UserInfo />
            </div>
        </div>
    );
};