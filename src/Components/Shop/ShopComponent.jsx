import { useEffect, useState } from "react";
import { useAuth } from '../Sercutiry/AuthContext';
import { GetShopApi, DeleteShopApi } from "../API/BookStoreApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ShopComponent() {
    let Auth = useAuth();
    let Navigate = useNavigate();
    let [shopData, setShopData] = useState({});
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }

    let retrieveShop = async () => {
        try {
            let response = await GetShopApi(sessionStorage.getItem("userId"), headers);
            sessionStorage.setItem("shopId", response.data.id);
            setShopData(response.data);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        retrieveShop();
    }, [Auth.roles])

    let handleUpdateShop = () => {
        Navigate("/updateshop")
    }

    let handleUpdateShopDetail = () => {
        Navigate("/updateshopdetail")
    }

    let handleDeleteShop = async () => {
        try {
            let response = await DeleteShopApi(sessionStorage.getItem("userId"), sessionStorage.getItem("shopId"), headers);
            Auth.setRoles(response.data);
            toast.success("Delete Shop Success!");
        }
        catch (error) {
            console.log(error);
            toast.error("Delete Shop Failed!");
        }
    }
    return (
        <>
            <div>ShopId: {shopData.id}</div>
            <div>ShopName: {shopData.shopName}</div>
            <div>ShopLogo: {shopData.shopLogoPath}</div>
            <div>ShopAddress: {shopData.shopAddress}</div>
            <div>ShopContactPhone: {shopData.contactPhone}</div>
            <div>ShopContactEmail: {shopData.contactEmail}</div>
            <br />
            <div><button onClick={handleUpdateShop}>Update Shop</button></div>
            <br />
            <div><button onClick={handleUpdateShopDetail}>Update Shop</button></div>
            <br />
            <div><button onClick={handleDeleteShop}>Delete Shop</button></div>
        </>
    )
}

export default ShopComponent;