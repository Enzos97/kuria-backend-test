import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CommonService } from 'src/common/common.service';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly commonService: CommonService,
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try{
      const newCategory = await this.categoryModel.create(createCategoryDto)
      return newCategory
    }catch(error){
      this.commonService.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.categoryModel.find()
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel.findById(id);

      if (!category) {
        throw new NotFoundException(
          `Could not find movie "${id}". Check that either the id is correct.`,
        );
      }
      return category;
    } catch (error) {
      this.commonService.handleExceptions(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto,{new:true})
      return category
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      await this.categoryModel.findByIdAndRemove(id)
      return "the category was removed"
    } catch (error) {
      this.commonService.handleExceptions(error)
    }
  }
}
