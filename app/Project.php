<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function students()
    {
        return $this->hasMany(Student::class, 'project_id');
    }

    public function sponsors()
    {
        return $this->belongsToMany(Sponsor::class);
    }

    public function blog()
    {
        return $this->hasOne(Blog::class, 'project_id');
    }

    public function technologies()
    {
        return $this->belongsToMany(Tecnology::class);
    }
}
