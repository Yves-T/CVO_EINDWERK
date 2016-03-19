<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'blog_id');
    }
}
