<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

use App\Http\Requests;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => [
            'getRecentTeasers',
            'getCommentsForPost'
        ]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Delete post with given post id.
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->title = $request->postTitle;
        $post->content = $request->postcontent;
        $post->update();
        return response()->json($post->title);
    }

    /**
     * Get 4 most recent teasers ordered by date created.
     * @return mixed
     */
    public function getRecentTeasers()
    {
        // 4 most recent blog posts with teaser
        $posts = Post::orderBy('created_at')->take(4)->get();
        foreach ($posts as $post) {
            $post->student;
            $post->read_more = (strlen($post->content) > 120) ? $this->getSnpippet($post->content, 30) : $post->content;
        }
        return response()->json($posts);
    }

    private function getSnpippet($str, $wordCount = 10)
    {
        return implode('', array_slice(
            preg_split(
                '/([\s,\.;\?\!]+)/',
                $str,
                $wordCount * 2 + 1,
                PREG_SPLIT_DELIM_CAPTURE
            ),
            0,
            $wordCount * 2 - 1
        ));
    }

    /**
     * Get comments for a given post.
     * @param $id
     * @return mixed
     */
    public function getCommentsForPost($id)
    {
        $post = Post::findOrFail($id);
        $comments = $post->comments;
        return response()->json($comments);
    }
}
