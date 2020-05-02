<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\User;
use App\Product;
use App\Order;
use App\Image;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class OrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('order.allorders');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function order($product_id, $quantity)
    {
        //dd($product_id, $quantity);
        $buyer= Auth::user();
        $product = Product::findOrFail($product_id);
        if($product->user_id == $buyer->id)abort(403);
        if($quantity>$product->stock)$quantity=$product->stock;
        if($quantity<1)$quantity=1;
        return view('order.create',[
            'user' => $buyer,
            'product' => $product,
            'quantity' =>$quantity,
        ]);
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->input());
        $user = Auth::user();
        
        //validate
        $validated = request()->validate([
            'product_id'=>[ 'required', 'numeric' ],
            'name'=>[ 'required','string'],
            'phone'=>[ 'required', 'string', 'size:11' ],
            'delivery_address'=>['required', 'string'],
            'vehicle_name'=>['required','string'],
            'vehicle_number'=>[ 'required', 'string' ],
            'vehicle_capacity'=>[ 'required', 'string' ],
            'quantity'=>[ 'required', 'string' ],
            'total_price'=>[ 'required', 'string' ],
            'payment_method'=>[ 'required',Rule::in(['Cash','bKash','Rocket','Nagad','Bank','Other']) ],
        ]);
        //dd($request->input());
        $product = Product::findOrFail($validated['product_id']);
        
        

        $seller = $product->user;
        if($user->id == $seller->id)abort(403);
        //dd($product);
        $quantity = $validated['quantity'];
        if($quantity < 1 ||  $quantity > $product->stock)abort(403);
        //dd($seller);
        
        $order= Order::create([
            'buyer_id' => $user->id,
            'seller_id' => $seller->id,
            'product_id'=> $validated['product_id'],
            'delivery_address'=> $validated['delivery_address'],
            'unit_price' => $product->price,
            'quantity'=> $validated['quantity'],
            'vehicle_name'=> $validated['vehicle_name'],
            'vehicle_number'=> $validated['vehicle_number'],
            'vehicle_capacity'=> $validated['vehicle_capacity'],
            'payment_method'=> $validated['payment_method'],
            
        ]);
        
        return redirect()->route('orders.index')->with('status',' আপনার অর্ডারটি সম্পাদন হয়েছে ');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
