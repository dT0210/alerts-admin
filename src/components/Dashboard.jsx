import { useEffect, useState } from "react";
import Nav from "./Nav"
import SideBar from "./SideBar"
import { useAuth } from "../auth/AuthProvider";

function Dashboard() {
    const [alerts, setAlerts] = useState();
    const [filteredAlerts, setFilteredAlerts] = useState(alerts);
    const auth = useAuth();
    const user = JSON.parse(auth.user);
    useEffect(() => {
        async function fetchAlerts() {
            try {
                const response = await fetch(`http://iotdog-alerts.cloudns.be/api/getAlerts.php?user=${user.UserId}`, {
                    method: "GET",
                });
                const res = await response.json();
                if (res.data) {
                    setAlerts(res.data);
                    setFilteredAlerts(res.data);
                    return;
                }
                throw new Error(res.message);
            } catch (error) {
                console.error(error);
            }
            
        }
        fetchAlerts();
    }, []);

    const updateAlerts = () => {
        const startDate = new Date(document.getElementById("startDate").value);
        const endDate = new Date(document.getElementById("endDate").value);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(24, 0, 0, 0);

        setFilteredAlerts(alerts.filter(alert => {
            const notificationTime = new Date(alert.NotificationTime);
            console.log(notificationTime >= startDate && notificationTime <= endDate);
            
            return notificationTime >= startDate && notificationTime <= endDate;
        }));
    }

    return (
        <div className="h-full">
            <Nav/>
            <div className="flex h-full w-full">
                <SideBar/>
                <div className="w-full p-2">
                    <div className="flex justify-between mb-2">
                        <div className="font-semibold text-xl">Alerts</div>
                        <div>
                            <label htmlFor="startDate">Start</label>
                            <input type="date" name="startDate" id="startDate" 
                                className="border border-black rounded ml-1 mr-2" 
                                defaultValue={'2000-01-01'} 
                                onChange={updateAlerts}
                            />
                            <label htmlFor="endDate">End</label>
                            <input type="date" name="endDate" id="endDate" 
                                className="border border-black rounded ml-1" 
                                defaultValue={new Date().toISOString().split('T')[0]} 
                                onChange={updateAlerts}
                            />
                        </div> 
                    </div>
                    <table className="w-full border border-black border-collapse">
                        <tr className="bg-[#ABCDFF] border-b border-black">
                            <th>Username</th>
                            <th>Device name</th>
                            <th>Notification time</th>
                            <th>Status</th>
                        </tr>
                        {filteredAlerts?.map((alert) => {
                            return (
                                <tr className="">
                                    <td className="text-center">{alert.Username}</td>
                                    <td className="text-center">{alert.DeviceName}</td>
                                    <td className="text-center">{alert.NotificationTime}</td>
                                    <td className="text-center">{alert.Status}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard;