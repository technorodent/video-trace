/**
 * Created by Rob on 12/10/2015.
 */
//See NOTES.txt
//Below is a totally awesome polyfill fix for the DOMParser
//without it the DOMParser returned element is null
/*
 * DOMParser HTML extension
 * 2012-02-02
 *
 * By Eli Grey, http://eligrey.com
 * Public domain.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/
var elem, removalArray = [];
var sPre = "     -- ";
var sPreFail = "     xx ";
getBinary = function (strFrag) {
    var res = [];
    strFrag.split('').forEach(function (letter) {
        var bin = letter.charCodeAt(0).toString(2),
            padding = 8 - bin.length;
        res.push(new Array(padding + 1).join('0') + bin);
    });
    var returnString = res.toString();
    returnString = returnString.replace(/,/g, " ");
    return returnString;
};
(function (DOMParser) {
    "use strict";
    var DOMParser_proto = DOMParser.prototype
        , real_parseFromString = DOMParser_proto.parseFromString;
    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {
    }
    DOMParser_proto.parseFromString = function (markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var doc = document.implementation.createHTMLDocument("")
                , doc_elt = doc.documentElement
                , first_elt;
            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;
            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {
                doc.replaceChild(first_elt, doc_elt);
            }
            return doc;
        } else {
            return real_parseFromString.apply(this, arguments);
        }
    };
}(DOMParser));
//end contribution ^^^
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var movieArray = ["Back to the Future", "Desperado", "Night at the Museum", "Robocop", "Ghostbusters", "Cool World", "Donnie Darko", "Double Indemnity", "The Spanish Prisoner", "The Smurfs", "Dead Alive", "Army of Darkness", "Peter Pan", "The Jungle Story", "Red Planet", "Deep Impact", "The Long Kiss Goodnight", "Juno", "(500) Days of Summer", "The Dark Knight", "Bringing Down the House", "se7en", "Chocolat", "The American", "The American President", "Hudsucker Proxy", "Conan the Barbarian", "Shrek", "The Fox and the Hound", "Lock, Stock, and Two Barrels", "Date Night", "200 Cigarettes", "9 1/2 Weeks", "Iron Man 2", "Tombstone", "Young Guns", "Fight Club", "The Cell", "The Unborn", "Black Christmas", "The Change-Up", "The Last of the Mohicans", "Shutter Island", "Ronin", "Ocean's 11", "Philadelphia", "Chariots of Fire", "M*a*S*H", "Walking and Talking", "Walking Tall", "The 40 Year Old Virgin", "Superman Iii", "The Hour", "The Slums of Beverly Hills", "Secretary", "Secretariat", "Pretty Woman", "Sleepless in Seattle", "The Iron Mask", "Smoke", "Schindler's List", "The Beverly Hillbillies", "The Ugly Truth", "Bounty Hunter", "Say Anything", "8 Seconds", "Metropolis", "Indiana Jones and the Temple of Doom", "Kramer vs Kramer", "The Manchurian Candidate", "Raging Bull", "Heat", "About Schmidt", "Re-Animator", "Evolution", "Gone in 60 Seconds", "Wanted", "The Man With One Red Shoe", "The Jerk", "Whip It", "Spanking the Monkey", "Steel Magnolias", "Horton Hears a Who", "Honey", "Brazil", "Gorillas in the Mist", "Before Sunset", "After Dark", "From Dusk Til Dawn", "Cloudy With a Chance of Meatballs", "Harvey", "Mr Smith Goes to Washington", "La Confidential", "Little Miss Sunshine", "The Future", "Howard the Duck", "Howard's End", "The Innkeeper", "Revolutionary Road 10 (1979)", "1941 (1979)", "48hrs (1982)", "9 to 5 (1980)", "A Christmas Story (1983)", "A Connecticut Yankee (1931)", "A Day at the Races (1937)", "A Fish Called Wanda (1988)", "A Florida Enchantment (1914)", "A Foreign Affair (1948)", "A Funny Thing Happened on the Way to the Forum (1966)", "A Girl in Every Port (1928)", "A Girl's Folly (1917)", "A Night at the Opera (1935)", "A Shot in the Dark (1964)", "A Thousand Clowns (1965)", "A Wedding (1978)", "Abbott and Costello Meet Frankenstein (1948)", "About Last Night... (1986)", "Ace Ventura, Pet Detective (1994)", "Adam's Rib (1949)", "Addams Family Values (1993)", "After Hours (1985)", "Airplane! (1980)", "Aladdin (1992)", "All of Me (1984)", "American Graffiti (1973)", "An American Werewolf in London (1981)", "Animal Crackers (1930)", "Annie Hall (1977)", "Arsenic and Old Lace (1944)", "Arthur (1981)", "As Good as It Gets (1997)", "Auntie Mame (1958)", "Austin Powers-- International Man of Mystery (1997)", "Avanti! (1972)", "Babe (1995)", "Bachelor Mother (1939)", "Back to School (1986)", "Back to the Future (1985)", "Ball of Fire (1941)", "Bananas (1971)", "Barefoot in the Park (1967)", "Beach Blanket Bingo (1965)", "Beat the Devil (1954)", "Bedtime for Bonzo (1951)", "Beetlejuice (1988)", "Being There (1979)", "Bell, Book and Candle (1958)", "Beverly Hills Cop (1984)", "Beyond the Valley of the Dolls (1970)", "Big (1988)", "Blazing Saddles (1974)", "Blessed Event (1932)", "Blondie (1938)", "Bluebeard's Eighth Wife (1938)", "Blume in Love (1973)", "Bob & Carol & Ted & Alice (1969)", "Bob Roberts (1992)", "Bombshell (1933)", "Born Yesterday (1950)", "Boy Meets Girl (1938)", "Breakfast at Tiffany's (1961)", "Brewster Mccloud (1970)", "Brewster's Millions (1921)", "Bringing up Baby (1938)", "Broadcast News (1987)", "Broadway Danny Rose (1984)", "Bronco Billy (1980)", "Brother Orchid (1940)", "Buck Privates (1941)", "Bull Durham (1988)", "Bullets Over Broadway (1994)", "Bulworth (1998)", "Bus Stop (1956)", "Bye Bye Birdie (1963)", "Cactus Flower (1969)", "Caddyshack (1980)", "California Split (1974)", "California Suite (1978)", "Car Wash (1976)", "Cat Ballou (1965)", "Catch-22 (1970)", "Champagne for Caesar (1950)", "Charade (1963)", "Christmas in Connecticut (1945)", "Christmas in July (1940)", "City Lights (1931)", "City Slickers (1991)", "Clerks (1994)", "Clueless (1995)", "Cluny Brown (1946)", "College (1927)", "Cooley High (1975)", "Cotton Comes to Harlem (1970)", "Dave (1993)", "Dear Ruth (1947)", "Defending Your Life (1991)", "Designing Woman (1957)", "Desperately Seeking Susan (1985)", "Destry Rides Again (1939)", "Dick Turpin (1925)", "Diner (1982)", "Dinner at Eight (1933)", "Divorce American Style (1967)", "Don't Change Your Husband (1919)", "Down and out in Beverly Hills (1986)", "Dr Strangelove Or: How I Learned to Stop Worrying (1964)", "Dubarry Was a Lady (1943)", "Duck Soup (1933)", "Dumb & Dumber (1994)", "Easy Living (1937)", "Eating Raoul (1982)", "Ella Cinders (1926)", "Elmer the Great (1933)", "Every Which Way but Loose (1978)", "Everything You Always Wanted to Know About Sex (Bu (1972)", "Fancy Pants (1950)", "Fargo (1996)", "Fast Times at Ridgemont High (1982)", "Father of the Bride (1950)", "Ferris Bueller's Day off (1986)", "Fletch (1985)", "Flirting With Disaster (1996)", "for Heaven's Sake (1926)", "Forrest Gump (1994)", "Foul Play (1978)", "Francis (1949)", "Freaky Friday (1977)", "Fun With Dick and Jane (1977)", "Funny Girl (1968)", "Gentlemen Prefer Blondes (1953)", "Get Shorty (1995)", "Ghost Chasers (1951)", "Ghostbusters (1984)", "Girl Crazy (1943)", "Girl Shy (1924)", "Good Morning, Vietnam (1987)", "Good News (1947)", "Goodbye, Columbus (1969)", "Groundhog Day (1993)", "Grumpy Old Men (1993)", "Gunga Din (1939)", "Hail the Conquering Hero (1944)", "Hairspray (1988)", "Hallelujah I'm a Bum (1933)", "Hannah and Her Sisters (1986)", "Harold and Maude (1972)", "Harry and Tonto (1974)", "Harvey (1950)", "Have Rocket, Will Travel (1959)", "Heathers (1989)", "Heaven Can Wait (1978)", "Hellzapoppin' (1941)", "Henry Aldrich, Editor (1942)", "High Anxiety (1977)", "Hips, Hips, Hooray (1934)", "His Girl Friday (1940)", "His Majesty, the American (1919)", "History of the World Part 1 (1981)", "Holiday (1938)", "Hollywood Shuffle (1987)", "Home Alone (1990)", "Horse Feathers (1932)", "House Party (1990)", "Houseboat (1958)", "How to Marry a Millionaire (1953)", "How to Succeed in Business Without Really Trying (1967)", "I Love You, Alice B Toklas! (1968)", "I Married a Witch (1942)", "in & out (1997)", "International House (1933)", "Irma La Douce (1963)", "It Happened One Night (1934)", "It Should Happen to You (1954)", "It's a Gift (1934)", "It's a Mad Mad Mad Mad World (1963)", "It's in the Bag! (1945)", "Jerry Maguire (1996)", "Kelly the Second (1936)", "Kill the Umpire (1950)", "Kiss Me Kate (1953)", "l.a Story (1991)", "Lady Killer (1933)", "Liar Liar (1997)", "Libeled Lady (1936)", "Life With Father (1947)", "Little Annie Rooney (1925)", "Little Miss Marker (1934)", "Little Murders (1971)", "Living in Oblivion (1995)", "Lost in America (1985)", "Love Finds Andy Hardy (1938)", "Love Me Tonight (1932)", "Lover Come Back (1961)", "Lovers and Other Strangers (1970)", "M*a*S*H (1970)", "Maisie Gets Her Man (1942)", "Manhattan (1979)", "Married to the Mob (1988)", "Mary Poppins (1964)", "Meatballs (1979)", "Melvin and Howard (1980)", "Men in Black (1997)", "Metropolitan (1990)", "Mexican Spitfire (1939)", "Midnight (1939)", "Midnight Run (1988)", "Min and Bill (1930)", "Minnie and Moskowitz (1971)", "Mister Roberts (1955)", "Modern Times (1936)", "Monkey Business (1931)", "Monkey Business (1952)", "Moonstruck (1987)", "Movie Crazy (1932)", "Mr Blandings Builds His Dream House (1948)", "Mr Deeds Goes to Town (1936)", "Mr Lemon of Orange (1931)", "Mrs Doubtfire (1993)", "Murder by Death (1976)", "Murder, He Says (1945)", "My Best Friend's Wedding (1997)", "My Cousin Vinny (1992)", "My Fair Lady (1964)", "My Favorite Brunette (1947)", "My Favorite Wife (1940)", "My Favorite Year (1982)", "My Little Chickadee (1940)", "My Man Godfrey (1936)", "National Lampoon's Animal House (1978)", "National Lampoon's Vacation (1983)", "Network (1976)", "Next Stop, Greenwich Village (1976)", "Night Shift (1982)", "Ninotchka (1939)", "No Time for Sergeants (1958)", "North Dallas Forty (1979)", "Nothing Sacred (1937)", "Ocean's Eleven (1960)", "Oh, God! (1977)", "One, Two, Three (1961)", "Operation Petticoat (1959)", "Orchids and Ermine (1927)", "Our Hospitality (1923)", "Paper Moon (1973)", "Parenthood (1989)", "Pat and Mike (1952)", "Pee-Wee's Big Adventure (1985)", "Peggy Sue Got Married (1986)", "Phffft! (1954)", "Pillow Talk (1959)", "Pink Flamingos (1974)", "Platinum Blonde (1931)", "Play It Again, Sam (1972)", "Police Academy (1984)", "Polyester (1981)", "Porky's (1981)", "Postcards From the Edge (1990)", "Pretty Woman (1990)", "Pride and Prejudice (1940)", "Private Benjamin (1980)", "Private Parts (1997)", "Prizzi's Honor (1985)", "Pulp Fiction (1994)", "Putney Swope (1969)", "Raising Arizona (1987)", "Real Life (1979)", "Rebecca of Sunnybrook Farm (1917)", "Repo Man (1984)", "Revenge of the Nerds (1984)", "Risky Business (1983)", "Road to Morocco (1942)", "Rock 'N' Roll High School (1979)", "Roman Holiday (1953)", "Roman Scandals (1933)", "Romancing the Stone (1984)", "Roxanne (1987)", "Ruggles of Red Gap (1935)", "s.o.b -1981", "Sabrina (1954)", "Safety Last (1923)", "Sailor Beware (1951)", "Say Anything... (1989)", "Shakespeare in Love (1998)", "Shampoo (1975)", "She Done Him Wrong (1933)", "She Loves Me Not (1934)", "Sherlock, Jr (1924)", "She's Gotta Have It (1986)", "Show People (1928)", "Silent Movie (1976)", "Silver Streak (1976)", "Singin' in the Rain (1952)", "Sister Act (1992)", "Sitting Pretty (1948)", "Sixteen Candles (1984)", "Slacker (1991)", "Slap Shot (1977)", "Sleeper (1973)", "Sleepless in Seattle (1993)", "Smile (1975)", "Smoke Signals (1998)", "Smokey and the Bandit (1977)", "so This Is Paris (1926)", "Soapdish (1991)", "Solid Gold Cadillac (1956)", "Some Like It Hot (1959)", "Son of Paleface (1952)", "Sons of the Desert (1933)", "Soup to Nuts (1930)", "Speedy (1928)", "Spite Marriage (1929)", "Splash (1984)", "Stage Door (1937)", "Stalag 17 (1953)", "Start the Revolution Without Me (1970)", "State of the Union (1948)", "Steamboat Bill, Jr (1928)", "Stir Crazy (1980)", "Stranger Than Paradise (1984)", "Stripes (1981)", "Sullivan's Travels (1941)", "Support Your Local Sheriff! (1969)", "Swingers (1996)", "Take the Money and Run (1969)", "Tammy and the Bachelor (1957)", "Teacher's Pet (1958)", "Terms of Endearment (1983)", "The Absent Minded Professor (1961)", "The Adventures of Buckaroo Banzai Across the Eight (1984)", "The Americanization of Emily (1964)", "The Apartment (1960)", "The Awful Truth (1937)", "The Bachelor and the Bobby-Soxer (1947)", "The Bad News Bears (1976)", "The Bank Dick (1940)", "The Bellboy (1960)", "The Big Picture (1989)", "The Birdcage (1996)", "The Blues Brothers (1980)", "The Bride Came c.o.d (1941)", "The Bride of Frankenstein (1935)", "The Brother From Another Planet (1984)", "The Cameraman (1928)", "The Candidate (1972)", "The Cat and the Canary (1939)", "The Circus (1928)", "The Cocoanuts (1929)", "The Court Jester (1956)", "The Crimson Pirate (1952)", "The Devil and Miss Jones (1941)", "The Egg and I (1947)", "The End (1978)", "The Farmer's Daughter (1947)", "The First Wives Club (1996)", "The Fortune Cookie (1966)", "The Freshman (1990)", "The Freshman (1925)", "The Front (1976)", "The Front Page (1931)", "The Gay Divorcee (1934)", "The General (1927)", "The Ghost and Mr Chicken (1966)", "The Gold Rush (1925)", "The Good Fairy (1935)", "The Goodbye Girl (1977)", "The Gracie Allen Murder Case (1939)", "The Graduate (1967)", "The Great Dictator (1940)", "The Great Mcginty (1940)", "The Great Race (1965)", "The Heartbreak Kid (1972)", "The Horn Blows at Midnight (1945)", "The Hospital (1971)", "The In-Laws (1979)", "The Inspector General (1949)", "The Jerk (1979)", "The Kentucky Fried Movie (1977)", "The Kid (1921)", "The Kid Brother (1927)", "The King of Comedy (1983)", "The Lady Eve (1941)", "The Landlord (1970)", "The Late Show (1977)", "The Lemon Drop Kid (1951)", "The Little Shop of Horrors (1960)", "The Long, Long Trailer (1954)", "The Longest Yard (1974)", "The Love Bug (1969)", "The Love Parade (1929)", "The Loved One (1965)", "The Major and the Minor (1942)", "The Male Animal (1942)", "The Man Who Came to Dinner (1941)", "The Man With Two Brains (1983)", "The Marriage Circle (1924)", "The Matchmaker (1958)", "The Mating Season (1951)", "The Merry Widow (1925)", "The Miracle of Morgan's Creek (1944)", "The More the Merrier (1943)", "The Muppet Movie (1979)", "The Naked Gun: Files From the Police Squad! (1988)", "The Naughty Nineties (1945)", "The Navigator (1924)", "The Night They Raided Minsky's (1968)", "The Nutty Professor (1963)", "The Nutty Professor (1996)", "The Odd Couple (1968)", "The Opposite of Sex (1998)", "The Out-Of-Towners (1970)", "The Palm Beach Story (1942)", "The Parent Trap (1961)", "The Party (1968)", "The Philadelphia Story (1940)", "The Pink Panther Strikes Again (1976)", "The Pirate (1948)", "The Player (1992)", "The President's Analyst (1967)", "The Prime of Miss Jean Brodie (1969)", "The Prince and the Showgirl (1957)", "The Princess Bride (1987)", "The Producers (1968)", "The Purple Rose of Cairo (1985)", "The Quiet Man (1952)", "The Raven (1963)", "The Ref (1994)", "The Rocky Horror Picture Show (1975)", "The Royal Family of Broadway (1930)", "The Russians Are Coming! The Russians Are Coming! (1966)", "The Senator Was Indiscreet (1947)", "The Seven Year Itch (1955)", "The Shop Around the Corner (1940)", "The Sting (1973)", "The Strong Man (1926)", "The Sunshine Boys (1975)", "The Talk of the Town (1942)", "The Taming of the Shrew (1967)", "The Tender Trap (1955)", "The Thin Man (1934)", "The Three Musketeers (1939)", "The Trouble With Harry (1955)", "The Twelve Chairs (1970)", "The Unbelievable Truth (1990)", "The War of the Roses (1989)", "The Waterboy (1998)", "The Wild Party (1929)", "The Women (1939)", "The World of Henry Orient (1964)", "Theodora Goes Wild (1936)", "There's Something About Mary (1998)", "This Is Spinal Tap (1984)", "Those Magnificent Men in Their Flying Machines (1965)", "Three Smart Girls (1936)", "Tillie's Punctured Romance (1914)", "To Be or Not to Be (1942)", "To Die for (1995)", "Tootsie (1982)", "Top Secret! (1984)", "Topper (1937)", "Torrid Zone (1940)", "Toy Story (1995)", "Trading Places (1983)", "Tramp, Tramp, Tramp (1926)", "Trouble in Paradise (1932)", "True Love (1989)", "Twentieth Century (1934)", "Twins (1988)", "Unfaithfully Yours (1948)", "up in Smoke (1978)", "Uptown Saturday Night (1974)", "Used Cars (1980)", "Valley Girl (1983)", "Victor/Victoria (1982)", "Wag the Dog (1997)", "Waiting for Guffman (1996)", "Watermelon Man (1970)", "Way out West (1937)", "Wayne's World (1992)", "We're No Angels (1955)", "What Price Glory (1926)", "What's New, Pussycat? (1965)", "What's up, Doc? (1972)", "When Harry Met Sally (1989)", "Where's Charley? (1952)", "Where's Poppa? (1970)", "Whistling in the Dark (1941)", "Who Framed Roger Rabbit (1988)", "Whoopee! (1930)", "Why Worry? (1923)", "Wild at Heart (1990)", "Will Success Spoil Rock Hunter? (1957)", "Willy Wonka and the Chocolate Factory (1971)", "Woman of the Year (1942)", "You Can't Cheat an Honest Man (1939)", "You Can't Take It With You (1938)", "Young Frankenstein (1974)", "Yours, Mine and Ours (1968)", "Zelig (1983)"];
shuffle(movieArray);
sendInsert = function (title, rating) {
    //console.log("is last : " + isLast);
    var http = new XMLHttpRequest();
    var url = 'http://mymoviedb.works/movies';
    var params = "title=" + title + "&rating=" + rating;
    http.open("POST", url, true);
    http.itemTitle = title;
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            if (http.status != 200) {
                console.log("error")
            } else {
                var parser = new DOMParser();
                var el = parser.parseFromString(http.responseText, "text/html");
                var oContainer = el.getElementById("container");
                var divList = oContainer.children[1];
                if (!divList.children.length) {
                    console.log("Reload: Nothing There!");
                } else if (divList.children[0].nodeName == "LI") {
                    var elem = divList.getElementsByTagName('LI');
                    for (var i = 0; i < elem.length; i++) {
                        var text = ('innerText' in elem[i]) ? 'innerText' : 'textContent';
                        var content = elem[i][text];
                        var sizedContent = content.substring(0, http.itemTitle.length);
                        console.log("  " + sPre + "String Compare: ['" + sizedContent + "'  '" + http.itemTitle + "']");
                        var rerunFlag = false;
                        switch (http.itemTitle.localeCompare(sizedContent)) {
                            case 0:
                                console.log("  " + sPre + "Pass: Input title exactly matches return title");
                                break;
                            case -1:
                                console.log("  " + sPreFail + "Fail: Input title < return title");
                                rerunFlag = true;
                                break;
                            case 1:
                                console.log("  " + sPreFail + "Fail: Input title > return title");
                                rerunFlag = true;
                                break;
                        }
                        if (rerunFlag) {
                            var bSizedContent = getBinary(sizedContent);
                            var bItemTitle = getBinary(http.itemTitle);
                            console.log("  " + sPreFail + "Return binary: " + bSizedContent.toString());
                            console.log("  " + sPreFail + "Source binary: " + bItemTitle.toString());
                        }
                        var idx = removalArray.indexOf(http.itemTitle);
                        if (idx > -1) {
                            removalArray.splice(idx, 1);
                        }
                        if (!removalArray.length) {
                            console.log("Task Complete: Reloading!");
                            location.reload();
                        }
                    }
                }
            }
        }
    };
    http.send(params);
};
console.log(sPre + "Randomly inserting 1 items out of 500 possible items.");
//totalItems = 10;
for (var i = 0; i < 1; i++) {
    removalArray.push(movieArray[i]);
    sendInsert(movieArray[i], 3);
    var tmpTitle = movieArray[i].trim().substring(0, 15) + "...";
    console.log("  " + sPre + "send xmlHTTP insert for " + tmpTitle);
}
if (!removalArray.length) {
    console.log("Reload: Insert Page Empty");
    location.reload();
}


