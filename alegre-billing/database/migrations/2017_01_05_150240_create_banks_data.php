<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBanksData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            /** @var \AlegreBill\Repositories\BankRepository $repository */
        $repository = app(\AlegreBill\Repositories\BankRepository::class);
        foreach ($this->getData() as $bankArray){
            $repository->create($bankArray);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $repository = app(\AlegreBill\Repositories\BankRepository::class);
        $repository->skipPresenter(true);
        $count = count($this->getData());
        foreach (range(1,$count) as $value){
            $model = $repository->find($value);
            $path = \AlegreBill\Models\Bank::logosDir().'/'.$model->logo;
            \Storage::disk('public')->delete($path);
        }
    }

    public function getData(){
        return [
            [
                'name' => 'Caixa',
                'logo' => new \Illuminate\Http\UploadedFile(
                    storage_path('app/files/banks/logos/caixa-logo.jpg'),
                    'caixa.jpeg'
                )
            ],
            [
                'name' => 'Bradesco',
                'logo' => new \Illuminate\Http\UploadedFile(
                    storage_path('app/files/banks/logos/Bradesco 1.JPG'),
                    'bradesco.jpeg'
                )
            ],
            [
                'name' => 'Itaú',
                'logo' => new \Illuminate\Http\UploadedFile(
                    storage_path('app/files/banks/logos/logo_itau.jpg'),
                    'itau.jpeg'
                )
            ],
            [
                'name' => 'Santander',
                'logo' => new \Illuminate\Http\UploadedFile(
                    storage_path('app/files/banks/logos/Santander_Logo14.jpg'),
                    'santander.jpeg'
                )
            ],
            [
                'name' => 'Banco do Brasil',
                'logo' => new \Illuminate\Http\UploadedFile(
                    storage_path('app/files/banks/logos/banco-do-brasil-logo.jpg'),
                    'bb.jpeg'
                )
            ]

        ];
    }
}
