<?php

namespace Tests\Feature\Receipts;

use App\Services\Receipts\PurchaseInvoiceServices;
use App\DTO\PurchaseInvoiceReqDTO;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Session;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PurchaseInvoiceServicesTest extends TestCase
{
    use RefreshDatabase;



    private function testCreateReceipt($debit = false)
    {
        $user = User::factory()->create();
        $session_id = Session::create(
            [
                'start_cash' => 1000.0,
                'user_id' => $user->id,
            ]
        )->id;
        dump($session_id);
        // Create a fake Supplier object
        $supplier = Supplier::factory()->create();
        // Create a fake Inventory object
        $inventory = Inventory::factory()->create();
        // Create fake Product objects
        $products = [
            Product::factory()->create(),
            Product::factory()->create(),
        ];

        $total = $products[0]->cost * 2 + $products[1]->cost * 3;
        $paid = $debit ? $total - 10 : $total;
        // Create a fake PurchaseInvoiceReqDTO object
        $req = PurchaseInvoiceReqDTO::fromArray([
            'supplier_id' => $supplier->id,
            'inventory_id' => $inventory->id,
            'session_id' => $session_id,
            'items' => [
                [
                    'product_id' => $products[0]->id,
                    'quantity' => 2,
                    'expiry_date' => '2022-12-31',
                ],
                [
                    'product_id' => $products[1]->id,
                    'quantity' => 3,
                    'expiry_date' => '2023-12-31',
                ],
            ],
            'payment' => [
                'method' => 'cash',
                'paid' => $paid,
                'discount' => 0.0,
                'notes' => 'this is a test payment',
            ],
        ]);


        // Call the createReceipt method
        $service = new PurchaseInvoiceServices();
        $service->createReceipt($req);

        // Assert that a new receipt was created in the database
        $this->assertDatabaseHas('receipts', [
            'from_id' => $req->supplier_id,
            'to_id' => $req->inventory_id,
        ]);

        // Assert that the receipt items were created in the database
        $receipt = Receipt::purchaseInvoices()->with('payment')->first();
        $this->assertNotNull($receipt);
        $this->assertCount(2, $receipt->items);

        // Assert that the payment was processed
        // (You'll need to replace this with your own assertion logic)
        $this->assertTrue($receipt->payment->method == 'cash');
        $this->assertTrue($receipt->payment->type == 'out');
        $this->assertTrue($receipt->payment->discount == 0.0);
        $this->assertTrue($receipt->payment->tax == 0);
        dump($receipt->payment->total ,$total);
        $this->assertTrue($receipt->payment->total == $total);
        $this->assertTrue($receipt->payment->subtotal == $total);
        $this->assertTrue($receipt->payment->paid == $paid);
        $this->assertTrue($receipt->payment->margin_profit == 0);
        $this->assertTrue($receipt->payment->notes == 'this is a test payment');

        // Assert Account was created
        if ($debit) {
            $this->assertDatabaseHas('accounts', [
                'client_id' => $req->supplier_id,
                'client_type' => Supplier::class,
                'type' => 'debit',
                'balance' => $total - $paid,
            ]);
        }

        // Assert that the side effect was triggered
        // (You'll need to replace this with your own assertion logic)
        $this->assertCount(2, $inventory->items);
        // check product ids
        $this->assertEquals(1, $inventory->items[0]->product_id);
        $this->assertEquals(2, $inventory->items[1]->product_id);
        // check quantities
        $this->assertEquals(2, $inventory->items[0]->quantity);
        $this->assertEquals(3, $inventory->items[1]->quantity);
        // check expiry dates
        $this->assertEquals('2022-12-31', $inventory->items[0]->expiry_date);
        $this->assertEquals('2023-12-31', $inventory->items[1]->expiry_date);
        $this->assertTrue(true);
    }

}
