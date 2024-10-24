import { SignupInput } from "@luciferdk/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        fullName: "",
        email: "",
        password: ""
    });


    async function sendRquest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Error while signup!")
        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrablod">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "don't have account" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "sign up" : "sign in"}
                        </Link>
                    </div>
                </div>
                <div className="px-2">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Your Full Name.." onChange={(e) => {
                        setPostInputs({
                            ...postInputs, //existing values and keys copy and paste on this field basicilly spreadout inside setPostInput
                            fullName: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="email" placeholder="Your Full Name.." onChange={(e) => {
                        setPostInputs({
                            ...postInputs, //existing values and keys copy and paste on this field basicilly spreadout inside setPostInput
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="password" type={"password"} placeholder="Your Password Please.." onChange={(e) => {
                        setPostInputs({
                            ...postInputs, //existing values and keys copy and paste on this field basicilly spreadout inside setPostInput
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRquest} type="button" className="w-full pt-4 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}



interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
    return <div>
        <div>
            <label className="block mb-2 text-sm text-black font-bold pt-5">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>

    </div>
}