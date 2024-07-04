import React, { Component } from 'react';



class Userinfo extends Component {
    state = {  } 
    render() { 
        return (
            <div className="">
                 <div class="flex items-center p-4">
                    <img src="src\assets\Headshot_Square.png" alt="" class="h-10 w-10 flex-none rounded-xl"/>
                    <div class="ml-4 flex-auto">
                        <div class="font-medium text-white">Dylan Detwiller</div>
                        <div class="mt-1 text-slate-400">@doubleD</div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Userinfo;