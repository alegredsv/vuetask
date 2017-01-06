<?php

namespace AlegreBill\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\AlegreBill\Repositories\BankRepository::class, \AlegreBill\Repositories\BankRepositoryEloquent::class);
        $this->app->bind(\AlegreBill\Repositories\BankAccountRepository::class, \AlegreBill\Repositories\BankAccountRepositoryEloquent::class);
        //:end-bindings:
    }
}
