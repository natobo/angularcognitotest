import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../modules/product';
import { MessengerService } from '../../../shared/messenger.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product

  constructor(private msg: MessengerService) {
    this.productItem = new Product(1000001, 'xd');
  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem);
  }

}
