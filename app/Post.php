<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function blog()
    {
        return $this->belongsTo(Blog::class, 'blog_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}
