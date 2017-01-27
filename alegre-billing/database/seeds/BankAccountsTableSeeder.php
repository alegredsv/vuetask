<?php

use Illuminate\Database\Seeder;

class BankAccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var \AlegreBill\Repositories\BankRepository $repository */
        $repository = app(\AlegreBill\Repositories\BankRepository::class);
        $repository->skipPresenter(true);
        $banks = $repository->all();
        $max = 15;
        $bankAccountId = rand(1,$max);
        factory(\AlegreBill\Models\BankAccount::class,$max)->make()->each(function($bankAccount) use($banks,$bankAccountId){
            $bank = $banks->random();
            $bankAccount->bank_id = $bank->id;
            $bankAccount->save();

            if($bankAccountId ==$bankAccount->id ){
                $bankAccount->default  = 1;
                $bankAccount->save();
            }
        });
    }
}
