<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $products = Storage::disk('local')->get('public/products.json');
      $products = json_decode($products, true);
      foreach ($products as $product)  {
        foreach ($product as $key => $value) {
          $insertArr[Str::slug($key,'_')] = $value;
        }
        DB::table('products')->insert($insertArr);
      }

      // for ($i=0; $i < 6; $i++) { 
	    // 	Student::create([
	    //         'first_name' => str_random(10),
	    //         'last_name' => str_random(10),
	    //         'address' => str_random(25)
	    //     ]);
    	// }
    }
}
