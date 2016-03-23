<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Post;
use App\Traits\CaptchaTrait;
use Illuminate\Http\Request;

use App\Http\Requests;

class CommentController extends Controller
{
    use CaptchaTrait;

    /**
     * Verify google catcha, return true if captcha was OK, false otherwise.
     * @param Request $request
     * @return mixed
     */
    public function checkGoogleCaptcha(Request $request)
    {
        if ($this->captchaCheck($request->input('g-recaptcha-response'))) {
            return response()->json(true);
        } else {
            return response()->json(false);
        }
    }

    /**
     * Add comment for a given post id.
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function addCommentForBlog($id, Request $request)
    {
        $post = Post::findOrFail($id);
        $comment = new Comment();
        $comment->nickname = $request->commentNickname;
        $comment->email = $request->commentEmail;
        $comment->comment = $request->commentContent;
        $comment->post()->associate($post);
        $comment->save();

        return response()->json($comment);
    }

}
