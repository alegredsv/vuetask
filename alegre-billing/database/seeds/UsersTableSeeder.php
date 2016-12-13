<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\AlegreBill\Models\User::class,1)->states('admin')->create([
            'email' => 'admin@user.com',
            'name' => 'Adriano Wichmann'
        ]);

        factory(\AlegreBill\Models\User::class,1)->states('client')->create([
            'email' => 'client@user.com',
            'name' => 'Cliente A'
        ]);
    }
}
