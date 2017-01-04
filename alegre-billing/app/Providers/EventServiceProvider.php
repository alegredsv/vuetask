<?php

namespace AlegreBill\Providers;

use AlegreBill\Events\BankCreatedEvent;
use AlegreBill\Events\BankStoredEvent;
use AlegreBill\Listeners\BankLogoUpload;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
       BankStoredEvent::class => [
           BankLogoUpload::class
       ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
