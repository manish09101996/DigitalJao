<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default('general'); // general, service, production_booking
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('service')->nullable();
            $table->string('production_category')->nullable();
            $table->string('event_date')->nullable();
            $table->string('budget')->nullable();
            $table->text('message');
            $table->enum('status', ['new', 'contacted', 'in_progress', 'completed', 'spam'])->default('new');
            $table->timestamps();
        });

        Schema::create('enquiry_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enquiry_id')->constrained('enquiries')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('note');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enquiry_notes');
        Schema::dropIfExists('enquiries');
    }
};
