<?php

namespace App\Http\Controllers;

use App\Blog;
use App\Project;
use App\Sponsor;
use App\Tecnology;
use DB;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

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
     * Handle project form submit for creating a project
     * @param Request $request
     * @return mixed
     */
    public function create(Request $request)
    {
        DB::beginTransaction();

        $project = new Project();
        $file = $request->file('file');
        if (isset($file)) {
            Storage::put($file->getClientOriginalName(), File::get($file));
            $project->image = $file->getClientOriginalName();
        }
        $project->title = $request->formData['projectTitle'];
        $project->isActive = $request->formData['projectActive'];
        $project->location = $request->formData['projectLocation'];
        $project->year = $request->formData['projectYear'];
        $project->longdescription = $request->formData['projectdescription'];
        $project->save();

        $blog = new Blog();
        $blog->project()->associate($project);
        $blog->save();

        if (isset($request->formData['selectedSponsors'])) {
            $sponsors = $request->formData['selectedSponsors'];
            $foundSponsors = [];
            foreach ($sponsors as $sponsor) {
                $foundSponsor = Sponsor::find($sponsor['id']);
                array_push($foundSponsors, $foundSponsor);
            }
            $project->sponsors()->saveMany($foundSponsors);
        }

        if (isset($request->formData['selectedTechnologies'])) {
            $technologies = $request->formData['selectedTechnologies'];
            $foundTechnologies = [];
            foreach ($technologies as $technology) {
                $foundTechnology = Tecnology::find($technology['id']);
                array_push($foundTechnologies, $foundTechnology);
            }
            $project->technologies()->saveMany($foundTechnologies);
        }

        DB::commit();

        return response()->json($request);
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
        $projects = Project::with('technologies')->get();
        return response()->json($projects);
    }
}
