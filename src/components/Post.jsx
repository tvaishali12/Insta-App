import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterList } from "./Filter";
import "../insta.css";
import { v4 } from "uuid";

const CreatePost = () => {
  const [getImage, setImage] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [gridVisible, setGridVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [posts, setPosts] = useState([]); // Initialize state for posts

  const selectImagesByUser = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  console.log("fdfs", getImage);

  const handleopenModal = () => setopenModal(true);
  const handleModalClose = () => setopenModal(false);

  const addCaption = (e) => {
    setCaption(e.target.value);
  };

  const applyFilterOnSelectedImage = () => {
    setGridVisible(!gridVisible);
  };
  const handleNextClick = () => {
    setInputVisible(true);
    setGridVisible(false);
  };

  const handlePostClick = () => {
    setPosts((item) => [
      { id: v4(), caption: caption, image: getImage, class: filterClass },
      ...item,
    ]);
    setopenModal(false);
    setImage(null);
    setInputVisible(false);
    setFilterClass("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleopenModal}>
        Create Post
      </Button>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box className="box">
          {getImage ? (
            <>
              {console.log("getimage", getImage)}
              <Button
                className="filterBtn"
                onClick={applyFilterOnSelectedImage}
              >
                Filter
              </Button>

              <img
                className={filterClass}
                src={getImage}
                style={{
                  height: "369px",
                  width: "399px",
                  position: "relative",
                }}
                alt="Selected-Image"
              />
              {inputVisible ? (
                <>
                  <div className="addCaption">
                    <textarea
                      name=""
                      className="textArea"
                      placeholder="Write Caption"
                      cols="30"
                      rows="10"
                      onChange={addCaption}
                    ></textarea>
                    <Button className="postBtn " onClick={handlePostClick}>
                      Post
                    </Button>
                  </div>
                </>
              ) : null}
              <div
                className={`filter-grid ${gridVisible ? "visible" : "hidden"}`}
              >
                <div className=" btnDiv">
                  <Button onClick={handleNextClick}>Next</Button>
                </div>

                {FilterList.map((item, index) => (
                  <div>
                    <img
                      className={item.class}
                      src={getImage}
                      onClick={() => setFilterClass(item.class)}
                      style={{ width: 120 }}
                    />

                    <div
                      className="filter-item"
                      // key={index}
                      onClick={() => setFilterClass(item.class)}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Create New Post</h2>
              <Button variant="contained" component="label">
                Select Images
                <input hidden onChange={selectImagesByUser} type="file" />
                {/*hidden is for hiding choose  */}
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {posts.map((item) => {
        return (
          <>
            <div id={item.id} className="postDiv">
              <img
                src={item.image}
                className={item.class}
                width={"400px"}
                alt=""
              />
              <h1>{item.caption}</h1>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default CreatePost;
