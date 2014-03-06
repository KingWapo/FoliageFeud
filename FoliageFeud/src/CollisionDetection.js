// Created by Iron Man 2/28/2014

// Script to detect collision between two objects
// Assumes that both objects have an x, y, width and height
function collisionDetection( collider1, collider2)
{
	if ( collider1.x > collider2.x + collider2.width ||
		 collider1.x + collider1.width < collider2.x ||
		 collider1.y > collider2.y + collider2.height ||
		 collider1.y + collider1.height < collider2.y) {
		return false;
	}
	else {
		return true;
	}
}