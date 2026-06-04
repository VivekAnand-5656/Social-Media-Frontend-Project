import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { SquareLoader } from "react-spinners";

const CreateReel = () => {
    const { token } = useContext(AuthContext);
    const [loading,setLoading] = useState()

    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);

    const apibase = "https://socialmediaproject-6sl8.onrender.com"

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Reel Creating");
        

        if (!file) {
            alert("Please select an Video");
            return;
        }

        try {
            setLoading(true)
            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("file", file);

            const response = await axios.post(
                `${apibase}/user/createreel`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            alert("Reel Posted Successfully");

            setCaption("");
            setFile(null);
        } catch (error) {
            console.log(error);
            alert("Failed to create post");
        } finally{
            setLoading(false)
        }
    };

    return (
        <div className="h-screen w-[80vw] p-2 bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#2563eb] flex items-center justify-center ">
        
                    <div 
                    className="w-full max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
        
                        <h2 className="mb-8 text-center text-4xl font-bold text-white">
                            Create Reel
                        </h2>
        
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            {/* Caption Input */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-blue-300">
                                    Caption
                                </label>
        
                                <textarea
                                    placeholder="What's on your mind?"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    rows={5}
                                    className="w-full resize-none rounded-2xl border border-blue-500/40 bg-[#1a2332] p-4 text-white outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                                />
                            </div>
        
                            {/* File Upload */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-blue-300">
                                    Upload Video
                                </label>
        
                                <input
                                    type="file"
                                    accept=".mp4"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    className="w-full cursor-pointer rounded-xl border border-dashed border-blue-500/50 bg-[#1a2332] p-4 text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                                />
                            </div>
        
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-2 rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/40"
                            >
                                Create Reel
                            </button>
                        </form>
                        {/* ------- ---------- */}
                        {
                            loading?(
                                <div
                                className="w-full fixed top-0 right-0 text-white flex justify-center items-center h-screen  max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                                    <SquareLoader
                                    loading={true}
                                    color="#ffffff"
                                    speedMultiplier={1}
                                    />
                                </div>
                                
                            ):(
                                <div
                                className=" hidden fixed w-full max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
        
                                </div>
                            )
                        }
        
                    </div>
                </div>
    );
};

export default CreateReel;