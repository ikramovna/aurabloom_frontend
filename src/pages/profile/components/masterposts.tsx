/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { FunctionComponent, useEffect, useState } from "react";

import { Api, Types } from "../../../modules/auth";
import { getCategory } from "../../../api/api";
import MasterPost from "./masterpost";

interface MasterPostsProps {}
 
const MasterPosts: FunctionComponent<MasterPostsProps> = () => {
    const [userpostsid, setUserpostsid] = useState(0);
    const [posts, setPosts] = useState<Types.IForm.PostsApi[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const { data } = await Api.UserProfil();
                setUserpostsid(data.id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserPosts();
    }, []);

    const fetchData = async (userpostsid: number) => {
        try {
            const { data: categoryData } = await getCategory();
            const { data: postData } = await Api.UserPosts(userpostsid);
            console.log(postData);
            
            const filteredPosts = postData.map(post => ({
                ...post,
                category: categoryData.find((cat: any) => cat.id === post.category)
            }));
            setPosts(filteredPosts);
            
            
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(userpostsid);
    }, [userpostsid]);

    
   

    return ( 
        <Box>
            <Grid container spacing={2} padding={2} sx={{margin:"0px"}}>
            {posts.map(({ description, category: postCategory, favorites_count, image: postImage, user, price, id, is_like, is_saved }: Types.IForm.PostsApi) => (
                <Grid container spacing={0} xs={12} sm={12} md={4} lg={3} key={id} sx={posts.length === 1 ? { marginLeft: "0px" } : {}}>
                    <MasterPost
                        fetchData={() => fetchData(userpostsid)} // fetchData fonksiyonunu çağıran işlevi iletiyoruz
                        is_bookmark={is_saved}
                        is_like={is_like}
                        favorites_count={favorites_count}
                        id={id}
                        posts={posts}
                        description={description}
                        categoryPosition={postCategory}
                        imagePost={postImage}
                        user={user}
                        price={price}
                        name={""}
                    />
                </Grid>
            ))}
            </Grid>
        </Box>
    );
}
 
export default MasterPosts;
