<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

use App\Http\Requests;

class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $projects = Project::where('isActive', '=', 1)->get();
        return response()->json($projects);
    }

    public function show()
    {

    }

    /**
     * Toglle the acctive status of a project.
     * @param $id
     */
    public function toggleActive($id)
    {
        $project = Project::findOrFail($id);
        $active = $project->isActive;
        $active = !$active;
        $project->isActive = $active;
        $project->update();
        return response()->json($id);
    }

    /**
     * Get all available projects.
     * @return mixed
     */
    public function getAllProjects()
    {
        $projects = Project::all();
        return response()->json($projects);
    }
}
