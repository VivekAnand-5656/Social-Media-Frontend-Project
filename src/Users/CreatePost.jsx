import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { SquareLoader } from "react-spinners";
import { toast, Slide } from "react-toastify";

const CreatePost = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState()

    const [caption, setCaption] = useState("");
    const [file, setFile] = useState(null);

    const apibase = "https://socialmediaproject-6sl8.onrender.com"

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image");
            return;
        }

        try {
            setLoading(true)
            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("file", file);

            const response = await axios.post(
                `${apibase}/user/createpost`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(`Post Uploaded`, {
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
            setLoading(false)
        }
    };

    return (
        <div className="h-screen w-[80vw] p-2 bg-[#ffffff] flex items-center justify-center ">

            <div
                className="w-[40%]  rounded-3xl border border-orange-400/30 bg-[#FDEEE7]/90 backdrop-blur-md p-8 shadow-[0_0_40px_#FDEEE7]">

                <h2 className="mb-1.5 text-center text-2xl font-bold text-black">
                    Create Post 🚀
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    {/* Caption Input */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                            Caption
                        </label>

                        <textarea
                            placeholder="What's on your mind?"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            rows={5}
                            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-2 text-black outline-none transition-all duration-300 placeholder:text-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-black">
                            Upload Image
                        </label>

                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full cursor-pointer rounded-xl border border-dashed border-orange-500/50 bg-[#FDEEE7] p-2 text-black file:mr-4 file:rounded-lg file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 rounded-2xl bg-[#ff5100] py-1.5 cursor-pointer text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/40"
                    >
                        Create Post
                    </button>
                </form>
                {/* ------- ---------- */}
                {
                    loading ? (
                        <div
                            className="w-full fixed top-0 right-0 text-white flex justify-center items-center h-screen  max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                            <SquareLoader
                                loading={true}
                                color="#ffffff"
                                speedMultiplier={1}
                            />
                        </div>

                    ) : (
                        <div
                            className=" hidden fixed w-full max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">

                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default CreatePost;