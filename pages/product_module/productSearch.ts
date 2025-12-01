import { Page, expect } from '@playwright/test';

export class SearchPage{

constructor (private page: Page){}

async searchProductByName (name: string){
   const searchBox = this.page.getByRole ('textbox' , {name: 'Search product'});
   await searchBox.fill (name);
   await searchBox.press ('Enter');
}

async verifyExactMatch(text: string){

   const productlist = this.page.locator ('app-product');
   await expect(productlist).toBeVisible({timeout: 20000});

   const nameButtons = this.page.locator ('button.nameDiv');
   await expect(nameButtons.first()).toBeVisible ({timeout: 20000});

   const names = await nameButtons.allInnerTexts();
   expect(names.length).toBeGreaterThan (0);

   for (const name of names ){
      expect (name.trim().toLowerCase()).toBe(text.trim().toLowerCase());
   }
}

async verifyContains(text: string){

   const productlist = this.page.locator ('app-product');
   await expect(productlist).toBeVisible({timeout: 20000});

   const nameButtons = this.page.locator ('button.nameDiv');
   await expect(nameButtons.first()).toBeVisible ({timeout: 20000});

   const names = await nameButtons.allInnerTexts();
   expect(names.length).toBeGreaterThan (0);

   for (const name of names ){
      expect (name.trim().toLowerCase()).toContain(text.trim().toLowerCase());
   }
}

async verifyNoresult (searchValue: string){
    const productlist = this.page.locator ('app-product');
   await expect(productlist).toBeVisible({timeout: 20000});
   await this.page.waitForTimeout(3000);
   await expect (productlist).toContainText ('No Results Found');
}

}