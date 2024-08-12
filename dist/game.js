const IRON_WORKER_PRICE = 10;
const SILVER_WORKER_PRICE = 10;
const SULFUR_PRICE = 100;
const DRILL_PRICE = 1000;
const SILVER_MINE_STEPS = 10;

var iron = 10000;
var silver = 1000;
var gold = 0;

var iron_workers = 0;
var silver_workers = 0;
var sulfur = 0;
var drill_units = 0;
var silver_pick_steps = 0;


/**
 * Self-adjusting interval to account for drifting
 * 
 * @param {function} workFunc  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds)
 * @param {function} errorFunc (Optional) Callback to run if the drift
 *                             exceeds interval
 */
function AdjustingInterval(workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    }

    this.stop = function() {
        clearTimeout(timeout);
    }

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval-drift));
    }
}

function ironClick()
{
    iron = iron + 1;
    updateMetals();
}

function silverClick()
{
    if ((drill_units > 0) && (sulfur > 0))
    {        
        sulfur = sulfur - 1;
        silver_pick_steps = silver_pick_steps + 1;
        if (silver_pick_steps == SILVER_MINE_STEPS)
        {
            silver = silver + 1;
            drill_units = drill_units - 1;
            silver_pick_steps = 0;
        }
    }
    updateMetals();
}

function buyIronMiner()
{
    const number_workers_tobuy = document.getElementById('number_workers_tobuy').value;
    price_to_pay = (IRON_WORKER_PRICE*parseInt(number_workers_tobuy));
    if (iron >= price_to_pay )
    {
        iron = iron - price_to_pay;
        iron_workers = iron_workers + parseInt(number_workers_tobuy);
        updateMetals();
        updateWorkers();
    }
    else
    {
        console.log("Not enough iron")
    }
}

function buySilverMiner()
{
    const number_workers_tobuy = document.getElementById('number_silver_workers_tobuy').value;
    price_to_pay = (SILVER_WORKER_PRICE*parseInt(number_workers_tobuy));
    if (silver >= price_to_pay )
    {
        silver = silver - price_to_pay;
        silver_workers = silver_workers + parseInt(number_workers_tobuy);
        updateMetals();
        updateWorkers();
    }
    else
    {
        console.log("Not enough silver")
    }
}

function updateMetals()
{
    const iron_counter = document.getElementById('iron_counter');
    iron_counter.innerHTML  = iron + '<figure class="image is-32x32"><img src="img/beam.png"></figure>';
    const silver_counter = document.getElementById('silver_counter');
    silver_counter.innerHTML  = silver + '<figure class="image is-32x32"><img src="img/jewelry.png"></figure>';
    const sulfur_counter = document.getElementById('sulfur_counter');
    sulfur_counter.innerHTML  = sulfur + ' sulfur';
    const drill_counter = document.getElementById('drill_counter');
    drill_counter.innerHTML  = drill_units + ' drill';
}

function updateWorkers()
{
    const iron_worker_counter = document.getElementById('iron_worker_counter');
    iron_worker_counter.textContent = iron_workers;
    const silver_worker_counter = document.getElementById('silver_worker_counter');
    silver_worker_counter.textContent = silver_workers;
}

function buySulfur()
{
    const number_tobuy_sulfur = document.getElementById('number_tobuy_sulfur').value;
    price_to_pay = (SULFUR_PRICE*parseInt(number_tobuy_sulfur));
    if (iron > price_to_pay)
    {
        sulfur = sulfur + parseInt(number_tobuy_sulfur);
        iron = iron - price_to_pay
        updateMetals();
    }
    else
    {
        console.log("Not enough iron")
    }
}

function buyDrill()
{
    const number_tobuy_drill = document.getElementById('number_tobuy_drill').value;
    price_to_pay = (DRILL_PRICE*parseInt(number_tobuy_drill));
    if (iron > price_to_pay)
    {
        drill_units = drill_units + parseInt(number_tobuy_drill);
        iron = iron - price_to_pay;
        updateMetals();
    }
    else
    {
        console.log("Not enough iron")
    }
}

function mineSilverWorker()
{
    for (let i=0; i < silver_workers; i++)
    {
        if ((sulfur >= SILVER_MINE_STEPS) && (drill_units >= 1))
        {
            silver = silver + 1;
            sulfur = sulfur - SILVER_MINE_STEPS;
            drill_units = drill_units - 1;
            updateMetals();
        }
    }
}

function mineIronWorker()
{
    iron = iron + iron_workers;
}



function updateLabels()
{
    const iron_worker_label = document.getElementById('iron_worker_label');
    iron_worker_label.innerHTML  = '1 Iron miner costs ' + IRON_WORKER_PRICE + ' Iron';
    const silver_worker_label = document.getElementById('silver_worker_label');
    silver_worker_label.innerHTML  = '1 Silver worker costs ' + SILVER_WORKER_PRICE +' Silver';
}

function updateProductionOutput()
{
    const iron_prod_label = document.getElementById('iron_prod_label');
    iron_prod_label.innerHTML  = 'Production: '+ iron_workers +' Iron/sec';

    var silver_prod_real = 0;
    if ((drill_units >= 1) && (sulfur >=10))
    {
        silver_prod_real = silver_workers;
    }
    const silver_prod_label = document.getElementById('silver_prod_label');
    silver_prod_label.innerHTML  = 'Production: '+ silver_prod_real +' Silver/sec';
}

// For testing purposes, we'll just increment
// this and send it out to the console.
var justSomeNumber = 0;

// Define the work to be done
var doWork = function() {
    mineIronWorker();
    mineSilverWorker();
    updateMetals();
    updateProductionOutput();
};

// Define what to do if something goes wrong
var doError = function() {
    console.warn('The drift exceeded the interval.');
};

// (The third argument is optional)
var ticker = new AdjustingInterval(doWork, 1000, doError);

ticker.start();
window.onload = function() {
    updateLabels();
};


