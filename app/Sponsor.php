<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
