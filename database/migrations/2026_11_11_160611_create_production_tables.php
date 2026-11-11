<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('hero_image')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('production_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('production_category_id')->constrained('production_categories')->cascadeOnDelete();
            $table->string('title');
            $table->string('file_path');
            $table->string('media_type')->default('photo'); // photo or video
            $table->string('video_url')->nullable();
            $table->string('client_name')->nullable();
            $table->string('location')->nullable();
            $table->string('aspect_ratio')->default('landscape'); // landscape, portrait, square
            $table->boolean('featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('production_media');
        Schema::dropIfExists('production_categories');
    }
};
