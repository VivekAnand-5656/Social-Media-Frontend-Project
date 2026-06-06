import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { SquareLoader } from "react-spinners";
import { toast, Slide } from "react-toastify";

const CreateReel = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);

    const apibase = "https://socialmediaproject-6sl8.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Reel Creating");

        if (!file) {
            alert("Please select a Video");
            return;
        }

        try {
            setLoading(true);
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

            toast.success(`Reel Uploaded`, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            setCaption("");
            setFile(null);
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong ❌!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Responsive Viewport Container */
        <div className="w-full min-h-screen p-4 bg-white flex items-center justify-center">

            {/* Scale-friendly Card UI */}
            <div className="w-full max-w-md rounded-3xl border border-orange-400/30 bg-[#FDEEE7]/90 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_40px_#FDEEE7]">

                <h2 className="mb-4 text-center text-2xl font-bold text-black">
                    Create Reel 🎬
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    {/* Caption Input */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-black">
                            Caption
                        </label>
                        <textarea
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows={4}
                            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-3 text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-black">
                            Upload Video
                        </label>
                        <input
                            type="file"
                            accept=".mp4"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full cursor-pointer rounded-xl border border-dashed border-orange-500/50 bg-[#FDEEE7] p-2 text-black file:mr-4 file:rounded-lg file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-2xl bg-[#ff5100] py-2 cursor-pointer text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-[#e04700]"
                    >
                        Create Reel
                    </button>
                </form>
            </div>

            {/* Theme-matching Global Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center z-50">
                    <SquareLoader
                        loading={true}
                        color="#ff5100"
                        speedMultiplier={1}
                    />
                </div>
            )}
        </div>
    );
};

export default CreateReel;