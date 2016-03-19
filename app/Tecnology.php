<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tecnology extends Model
{
    function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
