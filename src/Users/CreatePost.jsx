import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const CreatePost = () => {
    const { token } = useContext(AuthContext);

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

            console.log(response.data);
            alert("Post Created Successfully");

            setCaption("");
            setFile(null);
        } catch (error) {
            console.log(error);
            alert("Failed to create post");
        }
    };

    return (
        <div className=" w-[80vw] h-screen flex flex-col justify-center items-center " >
           
            <h2>Create Post</h2>

            <form onSubmit={handleSubmit} 
            className=" w-[30%] p-3 rounded-4xl border  " >
                <input
                    type="text"
                    placeholder="Enter caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <br />
                <br />

                <button type="submit">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;