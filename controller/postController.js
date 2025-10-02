
import post from "../models/postmodel.js";



export const createPost = async(req,res)=>{
    try{
        //console.log("here at create post ")

        const newPost = await new post(req.body);
        //console.log("here at create post ")
        newPost.save();
        return res.status(200).json('Post successfully saved')
    }
    catch(error){
        return res.status(500).json({error:error})
    }
}

export const getPosts = async(req,res)=>{
    try{
        const {category} = req.query;
        let posts;
        if(category){
             posts =  await post.find({category:category});
        }
        else{
            posts = await post.find({})
        }
        
        return res.status(200).json(posts)
    }
    catch(error){
        //console.log("Error in responding getPosts Api")
        return res.status(400).json({msg:"Error in Responding Api"})
    }
    

}

export const updatePost = async (req, res) => {
  try {
    //console.log("Params:", req.params); // { id: '...' }
    //console.log("Body:", req.body);     // { title: '...', description: '...' }

    const updatedPost = await post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ msg: "Post not found" });

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(400).json({ msg: "Error updating post" });
  }
};

export const getPostById = async(req,res)=>{
    try{

        const userpost = await post.findById(req.query.id)

        return res.status(200).json(userpost)
    }
    catch(error){
        return res.status(400).json({msg:"There is error in get Post"})
    }


}

export const deletePost = async (req, res) => {
  try {
    console.log("Query:", req.query);

    const userPost = await post.findById(req.query.id);

    if (!userPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await post.findByIdAndDelete(req.query.id);

    return res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ msg: "Error in deleting post" });
  }
};
