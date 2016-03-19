<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTecnologiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tecnologies', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name', 200);
            $table->integer('project_id')->unsigned()->index();
            $table->foreign('project_id')->references('id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tecnologies',function (Blueprint $table) {
            $table->dropForeign('tecnologies_project_id_foreign');
            $table->dropColumn('project_id');
        });
    }
}
